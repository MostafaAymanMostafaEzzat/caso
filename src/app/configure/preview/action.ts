"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function creatSession({ ConfigID }: { ConfigID: string }) {
  const configuration = await db.configuration.findUnique({
    where: { id: ConfigID },
  });

  if (!configuration) {
    throw new Error("No such configuration found");
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let Order = await db.order.findFirst({
    where: {
      configurationId: configuration.id,
      userId: user.id,
    },
  });

  if(!Order){
    Order = await db.order.create({
        data:{
            amount:price /100,
            configurationId:ConfigID,
            userId:user.id
        }
    })
  }

  console.log('actionnnnnnnnnnnnnnn')
  const product = await stripe.products.create({
    name:'Custom iPhone Case',
    images:[configuration.imageUrl],
    default_price_data :{
        currency: 'USD',
        unit_amount: price
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items:[
       {
        price: product.default_price as string,
        quantity: 1
       }
    ],
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['DE', 'US'] },
    metadata: {
        userId: user.id,
        orderId: Order.id,
      },
    mode:"payment",
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${Order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
  })
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

  return { url: session.url }
}

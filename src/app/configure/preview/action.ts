// "use server";

// import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
// import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
// import { db } from "@/db";
// import { stripe } from "@/lib/stripe";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

// export default async function creatSession({ ConfigID }: { ConfigID: string }) {
//   const configuration = await db.configuration.findUnique({
//     where: { id: ConfigID },
//   });

//   if (!configuration) {
//     throw new Error("No such configuration found");
//   }

//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   const { finish, material } = configuration;

//   let price = BASE_PRICE;
//   if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
//   if (material === "polycarbonate")
//     price += PRODUCT_PRICES.material.polycarbonate;

//   let Order = await db.order.findFirst({
//     where: {
//       configurationId: configuration.id,
//       userId: user.id,
//     },
//   });

//   if(!Order){
//     Order = await db.order.create({
//         data:{
//             amount:price /100,
//             configurationId:ConfigID,
//             userId:user.id
//         }
//     })
//   }

//   const product = await stripe.products.create({
//     name:'Custom iPhone Case',
//     images:[configuration.imageUrl],
//     default_price_data :{
//         currency: 'USD',
//         unit_amount: price
//     }
//   });



//   const session = await stripe.checkout.sessions.create({
//     line_items:[
//        {
//         price: product.default_price as string,
//         quantity: 1
//        }
//     ],
//     payment_method_types: ['card'],
//     shipping_address_collection: { allowed_countries: ['DE', 'US'] },
//     metadata: {
//         userId: user.id,
//         orderId: Order.id,
//       },
//     mode:"payment",
//     success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${Order.id}`,
//     cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
//   })

//   const { data, error } = await resend.emails.send({
//     from: 'caso <es-Moustafa.Ezzat2026@alexu.edu.eg>',
//     to: ['mostafaaymna6@gmail.com'],
//     subject: 'Thanks for your order!',
//     react: OrderReceivedEmail({
//         Order,
//         orderDate: '2022/3/22',
//         // @ts-ignore
//         shippingAddress: {
//           name: 'session.customer_details!.name!',
//           city: 'ShippingAddress!.city!',
//           country: 'ShippingAddress!.country!',
//           postalCode: 'ShippingAddress!.postal_code!',
//           street: 'ShippingAddress!.line1!',
//           state: 'ShippingAddress!.state',
//         },
//       }),


//     })
//   return { url: session.url }
// }

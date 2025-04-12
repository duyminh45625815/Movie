import { createTicket } from '@/lib/actions';
import { FoodItem, Ticket, TypeTicket } from '@/types';
import crypto from 'crypto';
export async function POST(request:Request) {
  const Request = await request.json()
  const partnerCode = 'MOMO';
  const accessKey =  process.env.ACCESSKEY;
  const secretKey = process.env.SECRETKEY;
  const requestId = partnerCode + new Date().getTime();
  const orderId = requestId;
  const orderInfo = 'Payment with Momo';
  const redirectUrl = `http://localhost:3000/booking/${Request.showtime._id}`; 
  const ipnUrl = 'http://localhost:3000/api/momo/ipn'; 
  const amount = Request.totalPrice; 
  const requestType = 'payWithMethod';
  const extraData = ""; 
  
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');


  const ticketData:TypeTicket = {
    
    showtime: Request.showtime._id,
    user: Request.user.id,
    seats: Request.seats.map((seat: { row: string; number: number; }) => `${seat.row}${seat.number}`), 
    combo: Request.combo.map((item: { food: FoodItem; quantity: number; }) => ({
      food: item.food,
      quantity: item.quantity
    })),
    totalPrice: Request.totalPrice,
    status: "pending",
  };
  

  
  const requestBody = {
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: 'en',
  };

  try {
    const momoResponse = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });
    const data = await momoResponse.json();
    if(data.resultCode ===0){
      
     const dataTicket= await createTicket(ticketData) as Ticket
      Request._id = dataTicket?._id;
     
    }
    
    return new Response(JSON.stringify({
       bookingId: Request?._id, 
       momoResponse:data,   
    }), { status: 200 });
  } catch (error) {
    console.error('Error creating Momo payment:', error);
    return new Response(JSON.stringify({ error: 'Failed to create payment' }), { status: 500 });
  }
}
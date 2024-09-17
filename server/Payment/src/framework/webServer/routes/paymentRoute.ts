import {Next,Req,Res,Route} from '../../types/serverPakageTypes'
import {paymentController} from './injections/injection'
import { isUser } from '../middleware/roleAuth'
export function paymentRout(router:Route){
  
  router.post('/create-checkout-session',async(req:Req,res:Res,next:Next)=>{
    paymentController.checkout(req,res,next)
  })  
  router.post('/success/:sessionId',(req:Req,res:Res,next:Next)=>{
    paymentController.success(req,res,next)
  })
//   app.get('/', async (req, res) => {
//     const {sessionId} = req.params;
//   console.log(sessionId)
// //   console.clear()
  
//     // Fetch session data using the function above
//     const sessionData = await getSessionData(sessionId);
  
//     // Do something with the session data (e.g., save to your database, display success message, etc.)
//     res.json({ message: 'Payment successful', sessionData });
//   });
}
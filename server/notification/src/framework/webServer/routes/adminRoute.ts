import { Next, Req, Res, Route } from "../../types/serverPakageTypes";
import { isAdmin } from "../middleware/roleAuth";
import { activeController, adminController } from "./injections/injection";

export function adminRouter(router: Route) {
    router.post('/login', (req: Req, res: Res, next: Next) => {
        adminController.adminLogin(req, res, next)
    })
    router.post('/logout', isAdmin, (req: Req, res: Res, next: Next) => {
        adminController.logout(req, res, next);
    })
    router.get('/userData', isAdmin, (req: Req, res: Res, next: Next) => {
        adminController.getUserData(req, res, next);
    })
    router.post('/blockUser', isAdmin, (req: Req, res: Res, next: Next) => {
        adminController.blockUser(req, res, next);
    })
    router.get('/topTenUser', isAdmin, (req: Req, res: Res, next: Next) => {
        activeController.getToptenActiveUser(req, res, next)
    })
}
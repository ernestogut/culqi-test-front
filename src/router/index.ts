import { createRouter, createWebHistory } from "vue-router";
import disallowInvalidRoutes from "./middleware";
import routes from "@/routes";
import validateStyles from "./validateStyles";
const router = createRouter({
    history: createWebHistory("/"),
    routes,
});

router.beforeEach(disallowInvalidRoutes);
router.beforeEach(validateStyles)
export default router;

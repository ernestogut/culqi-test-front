import { NavigationGuardNext, RouteLocationNormalized, NavigationGuard } from 'vue-router';
import { isUserLoggedIn } from '@/auth/utils';

const isAuthenticated: NavigationGuard = (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // Verificar si el usuario está autenticado
    if (to.meta.requiresAuth && !isUserLoggedIn()) {
        // Redirigir a la página de inicio de sesión si se requiere autenticación y el usuario no está autenticado
        next({ name: 'login' });
    } else if (to.name == 'login' && isUserLoggedIn()) {
        // Si el usuario está autenticado y trata de acceder a la página de inicio de sesión, redirigirlo a la pagina de inicio
        next({ name: 'home' });
    } else {
        // Continuar con la navegación
        next();
    }
};

export default isAuthenticated;
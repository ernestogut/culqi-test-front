import { NavigationGuardNext, RouteLocationNormalized, NavigationGuard } from 'vue-router';

const validateStyles: NavigationGuard = (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // Verificar si el usuario está autenticado
    if (to.name == 'login') {
        document.getElementById('app')?.classList.remove('card-section');
    } else {
        document.getElementById('app')?.classList.add('card-section');
    }
    // Continúa con la navegación
    next();
};

export default validateStyles;
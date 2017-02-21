/**
 * Created by igor on 21.02.17.
 */

import router from 'koa-route';
import controller from './controller';

export default (use) => {
    use(router.put('/api/contact', controller.contactAdd));

    use(router.delete('/api/contact/:id', controller.removeContact));
    use(router.post('/api/contact/:id', controller.upadateContact));
};

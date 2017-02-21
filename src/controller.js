/**
 * Created by igor on 21.02.17.
 */

import PhoneBook from './model';

export default {
    contactAdd: async(ctx) => {
        try {
            const {name, second, phones} = ctx.request.fields;
            const userId = ctx.cookie.session;
            const field = new PhoneBook({
                name,
                second,
                phones,
                userId
            });
            await field.save();
            ctx.body = JSON.stringify(field);
        } catch (err) {
            ctx.body = JSON.stringify(err);
        }
    },
    removeContact: async(ctx, _id) => {
        try {
            await PhoneBook.remove({_id});
            ctx.body = JSON.stringify({_id: _id});
        } catch (err) {
            ctx.body = JSON.stringify(err);
        }
    },
    upadateContact: async(ctx, _id) => {
        try {
            const {name, second, phones} = ctx.request.fields;
            await PhoneBook.update({_id}, {$set: {name, second, phones}}).exec();
            ctx.body = JSON.stringify({name, second, phones, _id});
        } catch (err) {
            ctx.body = JSON.stringify(err);
        }
    }
};

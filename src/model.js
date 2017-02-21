/**
 * Created by igor on 19.02.17.
 */

import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = Promise;
mongoose.connect(config.db);

export default mongoose.model('PhoneBook', {
    name: String,
    second: String,
    phones: Array,
    userId: String
});

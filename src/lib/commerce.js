import Commerce from '@chec/commerce.js';

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
//export const commerce = new Commerce('pk_4929015c2197ecdeda5db781702caf65b68b023e0e436');
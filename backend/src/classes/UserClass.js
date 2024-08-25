class UserClass extends Parse.User {

    constructor() {
        super();
    }

    static async signUp(newUser) {
        const user = new UserClass();

        Object.entries(newUser).forEach(([key, value]) => {
            user.set(key, value);
        })
        try {
            const res = await user.signUp();
            return res.toJSON();
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    static async login(username, password) {
        try {
            const res = await Parse.User.logIn(username, password);
            return res.authenticated();
        }
        catch (e) {
            throw new Error(e.message);
        }
    }

    // /**
    //  * @param {string} objectId
    //  * @param {{
    //  *     title: string
    //  *     finalPrice: number
    //  *     previousPrice?: number
    //  *     image: string
    //  *     reductionPercent?: number
    //  *     stars: {
    //  *         number: number
    //  *         total: number
    //  *     }
    //  *     colorList?: string[]
    //  *     sizeList?: string[]
    //  * }} product
    //  * @returns {Promise<Parse.Object.ToJSON<T> & Parse.JSONBaseAttributes>}
    //  */
    // static async updateProduct(objectId, product) {
    //     const prod = await ProductClass.getProductByObjectId(objectId);
    //     Object.entries(product).forEach(([key, value]) => {
    //         prod.set(key, value);
    //     });
    //     const res = await prod.save();
    //     return res.toJSON();
    // }

    // static async deleteProduct(objectId) {
    //     const prod = await ProductClass.getProductByObjectId(objectId);
    //     const res = await prod.destroy();
    //     return res.toJSON();
    // }
    //
    //
    //
    // static async getProductByObjectId(objectId) {
    //     const query = new Parse.Query(ProductClass);
    //     return await query.get(objectId);
    // }
}

module.exports = ProductClass;

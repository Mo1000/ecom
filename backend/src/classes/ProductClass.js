class ProductClass extends Parse.Object {
    static parseClassName = "Product";

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(ProductClass.parseClassName);
    }

    /**
     * @param {string} objectId
     * @param {{
     *     title: string
     *     finalPrice: number
     *     previousPrice?: number
     *     image: string
     *     reductionPercent?: number
     *     stars: {
     *         number: number
     *         total: number
     *     }
     *     colorList?: string[]
     *     sizeList?: string[]
     * }} product
     * @returns {Promise<Parse.Object.ToJSON<T> & Parse.JSONBaseAttributes>}
     */
    static async updateProduct(objectId, product) {
        const prod = await ProductClass.getProductByObjectId(objectId);
        Object.entries(product).forEach(([key, value]) => {
            prod.set(key, value);
        });
        const res = await prod.save();
        return res.toJSON();
    }

    static async deleteProduct(objectId) {
        const prod = await ProductClass.getProductByObjectId(objectId);
        const res = await prod.destroy();
        return res.toJSON();
    }



    static async getProductByObjectId(objectId) {
        const query = new Parse.Query(ProductClass);
        return await query.get(objectId);
    }
}

module.exports = ProductClass;

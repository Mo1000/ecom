const logger = require("../../../logger");
const ProductService = require("../../../classes/ProductClass");

Parse.Cloud.define("updateProduct", async (request) => {
    logger.info("===UpdateProduct start===");
    const {objectId, product} = request.params;

    Object.assign(product,{
        finalPrice:Number(product?.finalPrice),
        previousPrice:Number(product?.previousPrice),
        reductionPercent:Number(product?.reductionPercent)
    })
    return await ProductService.updateProduct(objectId, product);
});

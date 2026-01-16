export const Cart = async (req,res)=>{
    try{
        const {totalItems,totalPrice,items} = req.body
        console.log(items)
        console.log(totalItems)
        console.log(totalPrice)
        return res.status(200).json({
            success: true,
            message: "Cart data received successfully"})

    }
    catch(err){
        console.log(err)
    }
}
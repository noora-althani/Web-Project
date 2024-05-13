import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS Param -------------------")
    console.log(params.orderID)
    const orderId = params.orderID
    const order = await carSaleManagementRepo.getOrderById(orderId);
    return Response.json( order, { status: 200 })
}


  
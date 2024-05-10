import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS Param -------------------")
    console.log(params.sellerID)
    const sellerId = params.sellerID
    const seller = await carSaleManagementRepo.getSellerById(sellerId);
    return Response.json( seller, { status: 200 })
}
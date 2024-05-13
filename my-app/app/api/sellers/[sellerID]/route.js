import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    const sellerId = params.sellerID
    const seller = await carSaleManagementRepo.getSellerById(sellerId);
    return Response.json( seller, { status: 200 })
}

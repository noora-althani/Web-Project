import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const orders = await carSaleManagementRepo.getOrders();
    return Response.json(orders, { status: 200 })
}
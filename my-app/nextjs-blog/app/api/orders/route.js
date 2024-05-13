import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request){
    const orders = await carSaleManagementRepo.getOrders();
    return Response.json(orders, { status: 200 })
}
export async function POST(request) { //addds new order to db
    const order = await request.json();
    const newOrder = await carSaleManagementRepo.addOrder(order);
    return Response.json(newOrder, { status: 200 });
  }
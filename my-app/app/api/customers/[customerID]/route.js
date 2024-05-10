import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    
    const custId = params.customerID
    const cust = await carSaleManagementRepo.getCustomerById(custId);
    return Response.json(cust, { status: 200 })
}
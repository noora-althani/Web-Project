import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log(params)
    const custId = params.addressID;
    const cust = await carSaleManagementRepo.getAddressByCustId(custId);
    return Response.json(cust, { status: 200 })
}
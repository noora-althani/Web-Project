import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log(params)
    const custId = params.contactinfoID;
    const cust = await carSaleManagementRepo.getContactInfoByCustomerId(custId);
    return Response.json(cust, { status: 200 })
}
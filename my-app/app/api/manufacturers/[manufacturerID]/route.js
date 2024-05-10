import carSaleManagementRepo from "@/app/repo/carSaleManagement-repo";

export async function GET(request, { params }){
    console.log("HERE IS Param -------------------")
    console.log(params.manufacturerID)
    const manId = params.manufacturerID
    const manufacturer = await carSaleManagementRepo.getManufacturerById(manId);
    return Response.json(manufacturer, { status: 200 })
}
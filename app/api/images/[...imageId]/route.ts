import authOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(
  req: Request,
  {params: { imageId }} : {params: {imageId: string}}
){
  try{
    const session = await getServerSession(authOptions); 

    if(!session){
      return new NextResponse("Unathorized", { status: 401});
    }

    if(!imageId || imageId[0] === "undefined"){
     return new NextResponse("ImageId is required", { status: 400 });
    }

    console.log(imageId);

    const imageInSection = await prismadb.section.findMany({
      where: {
        images: {
          has: imageId[0],
        }
      }
    })

    if(imageInSection.length > 0){
      return new NextResponse("Image presente in una o più sezioni", { status: 400 });
    }

    const deletedImage = await prismadb.image.delete({
      where: {
        id: imageId[0],
      }
    })

    return NextResponse.json(deletedImage);
  } catch(err: any){
    console.log("ERROR_IMAGE_DELETE", err);
    return new NextResponse("Impossibile eliminare l'immagine", { status: 400 });
  }
}
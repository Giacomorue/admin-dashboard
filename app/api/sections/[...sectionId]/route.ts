import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import authOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { Image } from "@prisma/client";

export async function POST(
  req: Request,
  {params: {sectionId}} : {params: {sectionId: string}}
){
  try{
    const session = await getServerSession(authOptions);

    if(!session){
      return new NextResponse("Unauthorized", {status: 401});
    }

    const body = await req.json();
    const { 
      pageType, 
      name,
      title, 
      description, 
      primaryButton, 
      primaryButtonLinkPage, 
      secondaryButton, 
      secondaryButtonLinkPage, 
      dark, 
      imageLeft, 
      explenationInfo, 
      reviews, 
      hasBottomDot, 
      hasPrevAndNextBtn, 
      page, 
      images: imageArray 
    } = body;

    if(!sectionId[0]){
      return new NextResponse("sectionId is missing", {status: 400});
    }

    if(!pageType){
      return new NextResponse("pageType is missing", {status: 400});
    }

    if(!name){
      return new NextResponse("name is missing", {status: 400});
    }

    if(!title){
      return new NextResponse("pageType is missing", {status: 400});
    }

    const section = await prismadb.section.update({
      data: {
        pageType,
        name,
        title, 
        description, 
        primaryButton, 
        primaryButtonLinkPage, 
        secondaryButton, 
        secondaryButtonLinkPage, 
        dark, 
        imageLeft, 
        explenationInfo, 
        reviews, 
        hasBottomDot, 
        hasPrevAndNextBtn,  
        images: [...imageArray.map((singleImage: any) => singleImage.id)],
      },
      where: {
        id: sectionId[0]
      }
    });

    return NextResponse.json(section);
  } catch(err){
    console.log("SECTIONS_ID_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      {status: 500}
    );
  }
}

export async function DELETE(
  req: Request,
  {params: {sectionId}} : {params: {sectionId: string}}
){
  try{
    const session = await getServerSession(authOptions);

    if(!session){
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!sectionId[0]){
      return new NextResponse("sectionId is missing", {status: 400});
    }

    const isSectionInPage = await prismadb.page.findMany({
      where: {
        sections: {
          has: sectionId[0]
        }
      }
    })

    if(isSectionInPage.length > 0){
      return new NextResponse("Section is in pages", {status: 400});
    }

    const section = await prismadb.section.delete({
      where: {
        id: sectionId[0]
      }
    });

    return NextResponse.json(section);
  } catch(err){
    console.log("SECTIONS_ID_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      {status: 500}
    );
  }
}
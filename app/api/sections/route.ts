import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import authOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";

export async function POST(
  req: Request,
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

    if(!pageType){
      return new NextResponse("pageType is missing", {status: 400});
    }

    if(!name){
      return new NextResponse("name is missing", {status: 400});
    }

    if(!title){
      return new NextResponse("pageType is missing", {status: 400});
    }

    const section = await prismadb.section.create({
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
      }
    });

    return NextResponse.json(section);
  } catch(err){
    console.log("SECTIONS_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      {status: 500}
    );
  }
}
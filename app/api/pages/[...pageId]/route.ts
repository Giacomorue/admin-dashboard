import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import authOptions from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { Image } from "@prisma/client";

export async function POST(
  req: Request,
  {params: {pageId}} : {params: {pageId: string}}
){
  try{
    const session = await getServerSession(authOptions);

    if(!session){
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!pageId[0]){
      return new NextResponse("pageId is missing", {status: 400});
    }

    const body = await req.json();
    const { 
      pageName,
      link,
      navbarOrder,
      defaultPage,
      visiblePage,
      sections
    } = body;

    if(!pageName){
      return new NextResponse("pageName is missing", {status: 400});
    }

    if(!sections){
      return new NextResponse("pages is missing", {status: 400});
    }

    if(!navbarOrder){
      return new NextResponse("navbarOrder is missing", {status: 400});
    }

    const linkAlreadyExist = await prismadb.page.findFirst({
      where: {
        link,
      }
    })

    if(defaultPage === true){
      await prismadb.page.updateMany({
        data: {
          defaultPage: false,
        },
        where: {
          defaultPage: true,
        }
      })
    }

    if(defaultPage && !visiblePage){
      return new NextResponse(`La default page non può essere invisibile`, {status: 400});
    }

    if(linkAlreadyExist?.id && linkAlreadyExist?.id !== pageId[0]){
      return new NextResponse(`Link già esistente ${linkAlreadyExist?.id} - ${pageId[0]}`, {status: 400});
    }

    const page = await prismadb.page.update({
      data: {
        pageName,
        link,
        navbarOrder,
        visiblePage,
        sections,
        defaultPage,
      },
      where: {
        id: pageId[0],
      }
    });

    return NextResponse.json(page);
  } catch(err){
    console.log("PAGES_ID_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      {status: 500}
    );
  }
}

export async function DELETE(
  req: Request,
  {params: {pageId}} : {params: {pageId: string}}
){
  try{
    const session = await getServerSession(authOptions);

    if(!session){
      return new NextResponse("Unauthorized", {status: 401});
    }

    if(!pageId[0]){
      return new NextResponse("pageId is missing", {status: 400});
    }

    const pageToDelete = await prismadb.page.findUnique({
      where: {
        id: pageId[0]
      }
    });

    if(pageToDelete?.defaultPage){
      return new NextResponse("Is default page", {status: 400});
    }

    const page = await prismadb.page.delete({
      where: {
        id: pageId[0]
      }
    });

    return NextResponse.json(page);
  } catch(err){
    console.log("PAGES_ID_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      {status: 500}
    );
  }
}
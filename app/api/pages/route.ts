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
      return new NextResponse("sections is missing", {status: 400});
    }

    if(!navbarOrder){
      return new NextResponse("navbarOrder is missing", {status: 400});
    }

    const linkAlreadyExist = await prismadb.page.findUnique({
      where: {
        link
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

    if(linkAlreadyExist?.id){
      return new NextResponse("Link già esistente", {status: 402});
    }

    const section = await prismadb.page.create({
      data: {
        pageName,
        link,
        navbarOrder,
        visiblePage,
        sections,
        defaultPage,
      }
    });

    return NextResponse.json(section);
  } catch(err){
    console.log("PAGES_ERROR", err);
    return new NextResponse(
      "Internal Error", 
      { status: 500 }
    );
  }
}
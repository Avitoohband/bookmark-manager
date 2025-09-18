import { PrismaClient, Bookmark } from "../generated/prisma";
import { CreateBookmarkData } from "@/types/bookmark";

const prisma = new PrismaClient();

export async function getUserBookmark(userId: string): Promise<Bookmark[]> {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return bookmarks;
  } catch (error) {
    console.error("Error fetching user bookmarks:", error);
    throw new Error("Failed to fetch user bookmarks");
  }
}


export async function createBookmark(userId: string, data: CreateBookmarkData): Promise<Bookmark> {
    try{        
        const bookmark = await prisma.bookmark.create({
            data:{
                ...data,
                userId,
            },
        });
        return bookmark;
    }catch(error){
        console.error("Error creating bookmark:", error);
        throw new Error("Failed to create bookmark");
    }
}

export async function deleteBookmark(userId: string, bookmarkId: string): Promise<boolean> {
  try{
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if(!bookmark){
      throw new Error("Bookmark not found");
    }
    await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
    return true;
 
  }catch(error){
    console.error("Error deleting bookmark:", error);
    throw new Error("Failed to delete bookmark");
  }
}

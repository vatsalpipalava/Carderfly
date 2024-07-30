import { Navbar } from "@/components/modules/navbar/navbarHome";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.accessToken) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1235px] flex-col px-4 bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1]">
      <Navbar />
      <main className="flex h-full w-full flex-1 flex-col gap-4 md:gap-8">
        <div className="grid h-full min-h-[90vh] w-full grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex h-full w-full flex-col justify-center">
            <h1 className="mb-6 scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:text-left lg:text-5xl">
              Elevate Your Digital Business Card Experience
            </h1>
            <p className="mb-6 text-center text-xl text-muted-foreground sm:text-left">
              Craft elegant and professional digital business cards effortlessly
              with our intuitive online card maker.
            </p>
            <div className="flex justify-center gap-3 sm:justify-start">
              <Button className="rounded-full">Get Started</Button>
              <Button variant="outline" className="rounded-full">
                Watch Video
              </Button>
            </div>
          </div>
          <div className="hidden h-full w-full items-center justify-center sm:flex">
            <AspectRatio ratio={1 / 1}>
              <img
                src="https://cardifly.vercel.app/static/media/homePage.f7859b0785fb155e1cfb.png"
                alt="Image"
                className="h-auto w-full max-w-full object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </main>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function GetInTouch() {
  return (
    <main className="w-full pb-10">
      <div className="mx-auto h-auto w-full max-w-[1280px] px-4 sm:px-6">
        <Card className="flex h-auto w-auto flex-col items-center justify-between rounded-2xl border-none bg-muted md:flex-row">
          <CardContent className="h-auto w-auto px-6 py-10 sm:px-10">
            <CardHeader className="mb-5 px-0 py-0">
              <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                Still got questions?
              </h3>
            </CardHeader>
            <p className="max-w-[700px] text-xl text-muted-foreground">
              If you don&apos;t find an answer to your question, contact us, and
              our team will get in touch with you.
            </p>
          </CardContent>
          <CardFooter className="w-full pb-6 md:w-auto md:px-10 md:pb-0">
            <Button className="w-full rounded-full bg-black px-8 dark:bg-white dark:text-white md:w-auto">
              Email
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <main className="px-4 pb-8 pt-10">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-3 text-4xl font-bold tracking-tight">
            Crea il tuo fotolibro
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground">
            Personalizza ogni dettaglio del tuo fotolibro. Stampa di alta
            qualità, consegna rapida.
          </p>
        </div>

        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Fotolibro personalizzato</CardTitle>
            <CardDescription>
              Copertina rigida, carta opaca premium. Scegli formato, dimensioni
              e numero di pagine per creare il libro perfetto.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Da 10 a 100 pagine</Badge>
              <Badge variant="secondary">3 formati</Badge>
              <Badge variant="secondary">Confezione regalo</Badge>
              <Badge variant="secondary">Copertina personalizzata</Badge>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" asChild>
              <Link to="/configure" search={{ step: 1 }}>
                Inizia la configurazione
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

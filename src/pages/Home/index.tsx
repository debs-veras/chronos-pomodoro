import { useEffect } from "react";
import { Container } from "../../components/Container";
import { CountDown } from "../../components/CountDown";
import { MainForm } from "../../components/MainForm";
import { DefaultLayout } from "../../layout/DefaultLayout";

export function Home() {
  useEffect(() => {
    document.title = "Chronos Pomodoro";
  }, []);

  return (
    <DefaultLayout>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </DefaultLayout>
  );
}

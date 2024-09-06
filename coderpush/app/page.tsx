import Image from "next/image";
import { Button, Particle } from "./components";

export default function Home() {
  return (
    <>
      <section className="h-[900px] md:h-[1000px] relative bg-primary">
        <Particle />

        <div className="absolute z-10 top-24 md:top-36 left-0 right-0 m-auto h-full">
          <div className="flex flex-col gap-8 items-center justify-center h-full text-white">
            <div className="px-10 text-center items-center flex flex-col gap-6 md:w-[50rem]">
              <h1 className="animate__animated animate__fadeInDown animate__fast text-4xl md:text-5xl !leading-tight">Transforming Ideas Into Reality. Your Global Partner In Innovation</h1>
              <p className="animate__animated animate__fadeInDown animate__slow md:text-lg lg:mx-36">Unlocking Success Through Vetted Tech Talent: CoderPush Powers Your Business to New Heights</p>

              <Button variant="secondary" className="animate__animated animate__fadeInDown animate__slower inline-flex items-center gap-1"><span>LEARN MORE</span> <i className="icon-arrow-right-mini" /></Button>
            </div>
            <Image className="animate__animated animate__fadeInUp animate__slower" src="/images/logo-clutch.webp" alt="log-clutch" width={200} height={84} />
            <Image src="/images/hero-graphic-1.png" alt="hero-graphic" priority
              className="px-5 z-10" width={830} height={439} />
          </div>
        </div>
      </section >

      <section className="py-20 md:py-40 bg-accent">
        <h2 className="text-2xl md:text-4xl w-[20rem] md:w-[30rem] m-auto text-center font-semibold">Building A Great Team Starts With Great Technology</h2>

      </section>
    </>
  );
}

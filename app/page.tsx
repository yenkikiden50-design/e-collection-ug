import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Product from '../components/Product';
import ProductReviews from '../components/Productreviews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Section />
        <Product />
        <ProductReviews />
        <Footer />
      </main>
    </>
  );
}

import ProductCard from '@/components/ProductCard'
import axios from 'axios'

async function loadProducts() {
  try {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`
    )
    return data
  } catch (error) {
    console.error('Error al cargar los productos:', error.response || error)
    throw error
  }
}

async function ProductsPage() {
  const products = await loadProducts()

  return (
    <div className='grid gap-4 grid-cols-4'>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ProductsPage

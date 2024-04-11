import Link from 'next/link'

function ProductCard({ product }) {
  return (
    <Link
      className='bg-white rounded-lg border-gray-800 mb-3 hover:bg-gray-100 hover:cursor-pointer flex flex-col justify-center items-center overflow-hidden'
      href={`/products/${product.id}`}
    >
      {product.image && (
        <img src={product.image} alt='product image' className='h-44' />
      )}
      <div className='p-4 self-start'>
        <h1 className='text-lg font-bold'>{product.name}</h1>
        <h2 className='text-2xl text-slate-600'>{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  )
}

export default ProductCard

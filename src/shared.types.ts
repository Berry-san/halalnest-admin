// Admin Types
export interface AdminLoginRequest {
  email: string
  password: string
}

// Merchant Types
export interface Merchant {
  merchant_id: number
  names: string
  gender: string
  email: string
  address: string
  active_status: string
}

// Quote Types
export interface Quotes {
  quote_id?: string
  quote_title: string
  quote_content: string
  quote_header: string
}

// School Types
export interface SchoolRequest {
  school_id: string
  school_name: string
  halal_id: string
  halal_nest_item_id: string
  location: string
  min_tutorial_fee: number
  max_tutorial_fee: number
  living_facility: string
}

export interface School {
  school_id: string
  school_name: string
  school_scope: string
  school_phonenumber: string
  school_email?: string
  school_address: string
  image_1: string
  image_2: string
  video_url: string
  halal_id: string
  halal_nest_item_id: string
  location: string
  min_tutorial_fee: number
  max_tutorial_fee: number
  living_facility: string
}

// Video Types
export interface VideoRequest {
  video_title: string
  video_url: string
  video_description: string
  time_in?: string
}

export interface Video extends VideoRequest {
  video_id: string
}

// Product Types
export interface ProductRequest {
  product_name: string
  short_product_name: string
  product_price: number
  product_description: string
  product_model: string
  product_color: string
  product_quantity: string
  product_pictures: File
  expiry_date: Date
  category_id: number
  sub_category_id: number
  merchant_id: number
  product_discount_percentage: number
  vat: number
}

export interface Product {
  product_id: number | string
  category_id: string
  sub_category_id: string
  merchant_id: string
  product_name: string
  short_product_name: string
  product_description: string
  product_price: string
  product_model: string
  product_color: string
  product_picture?: {
    picture1?: string | File | undefined // Explicitly allow string or File here
  }
  expiry_date: string
  product_discount_percentage: string
  vat: string
  product_quantity: string
  created_at: string
  updated_at: string | null
  subcategory_name: string
  category_name: string
  vendor: string
  status: string
}

// Order Types
export interface OrderProduct {
  product_name: string
  product_quantity: number
  amount: number
}

export interface Order {
  orderId: string
  customerName: string
  orderDate: string
  amount: string
  status: string
  products: OrderProduct[]
  subTotal: number
}

export interface UpdateOrderStatusRequest {
  merchantId: string | number
  customerId: string | number
  newStatus: string | number
}

export interface MerchantOrder {
  // order_item_id: number
  // order_id: string
  order_reference: string
  product_id: string
  customer_id: string
  merchant_id: string
  price: string
  quantity: string | null
  product_name: string
  product_image: string
  payment_status: string
  insert_date: string
  merchant_status: string
}

export interface OrderHistoryItem {
  status: string
  updated_at: string
}

export interface DeliveryStatus {
  status: string
}

export interface Category {
  category_id: number
  category_name: string
  description: string
  created_at: string
}

export interface Subcategory {
  subcategory_id: number
  subcategory_name: string
  description: string
  category_id: number
}

export interface AddCategoryRequest {
  categoryName: string
  description: string
}

export interface AddSubcategoryRequest {
  subcategoryName: string
  description: string
  categoryId: number
}

export interface UpdateCategoryRequest {
  categoryName: string
  description: string
}

export interface UpdateSubcategoryRequest {
  subcategoryName: string
  description: string
}

export interface Mosque {
  halal_id: string
  halal_nest_item_id: string
  mosque_id: string
  mosque_name: string
  address: string
  video_link: string
  air_condition: string
  female_praying_section: string
  toilet: string
  image: { image1: string }
}

export interface Business {
  halal_id: string
  halal_nest_item_id: string
  business_id: string
  business_name: string
  address: string
  business_address: string
  business_phonenumber: string
  logo: string
  hca_certifaction: string
  business_category_id: string
  business_category: string
  image: { image1: string; image2?: string }
}

export interface ReportIssue {
  email: string
  username: string
  SUBJECT: string
  message: string
  time_in: string
}

export interface AddSchool {
  school_name: string
  halal_id: string
  halal_nest_item_id: string
  location: string
  min_tutorial_fee: string
  max_tutorial_fee: string
  living_facility: string
}

// -----------------------------------------------
// import jsPDF from "jspdf";

// interface OrderDetails {
//   user?: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     phone: string;
//     address: string;
//     city: string;
//     province: string;
//     landmark?: string;
//     zip?: string;
//   };
//   subtotal?: number;
//   totalSavings?: number;
//   total?: number;
//   couponCode?: string;
//   couponDiscount?: number;
//   bulkDiscount?: number;
//   paymentMethod?: string;
// }

// export const generateReceiptPDF = async (
//   orderId: string,
//   orderDetails: OrderDetails | null
// ) => {
//   console.log("🔍 [PDF Debug] Starting PDF generation with:", {
//     orderId,
//     orderDetails,
//     hasUser: !!orderDetails?.user,
//     paymentMethod: orderDetails?.paymentMethod,
//   });

//   if (!orderDetails) {
//     console.error("❌ [PDF Debug] orderDetails is null");
//     throw new Error("Order details are required to generate receipt");
//   }

//   const pdf = new jsPDF();
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();
//   const margin = 20;
//   let yPosition = margin;

//   // Brand Header
//   pdf.setFillColor(139, 190, 103); // #8BBE67
//   pdf.rect(0, 0, pageWidth, 60, "F");

//   pdf.setTextColor(255, 255, 255);
//   pdf.setFontSize(24);
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Zarwa Organics", pageWidth / 2, 25, { align: "center" });

//   pdf.setFontSize(12);
//   pdf.setFont("helvetica", "normal");
//   pdf.text("Order Confirmation Receipt", pageWidth / 2, 35, {
//     align: "center",
//   });

//   yPosition = 70;

//   // Order Status
//   pdf.setTextColor(139, 190, 103);
//   pdf.setFontSize(16);
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Order Received Successfully!", pageWidth / 2, yPosition, {
//     align: "center",
//   });

//   pdf.setTextColor(230, 126, 34);
//   pdf.setFontSize(10);
//   pdf.text("Payment Verification Pending", pageWidth / 2, yPosition + 8, {
//     align: "center",
//   });

//   yPosition += 25;

//   // Order Information
//   pdf.setTextColor(0, 0, 0);
//   pdf.setFontSize(12);
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Order Information", margin, yPosition);

//   yPosition += 8;
//   pdf.setDrawColor(139, 190, 103);
//   pdf.line(margin, yPosition, pageWidth - margin, yPosition);

//   yPosition += 12;

//   pdf.setFontSize(10);
//   pdf.setFont("helvetica", "normal");

//   // Order Details with safe access
//   const paymentMethod = orderDetails.paymentMethod
//     ? orderDetails.paymentMethod.replace("_", " ")
//     : "Bank Transfer";
//   const orderInfo = [
//     ["Order ID:", orderId || "N/A"],
//     ["Order Date:", new Date().toLocaleDateString()],
//     ["Payment Method:", paymentMethod.toUpperCase()],
//     ["Payment Status:", "PENDING VERIFICATION"],
//   ];

//   orderInfo.forEach(([label, value]) => {
//     pdf.setFont("helvetica", "bold");
//     pdf.text(label, margin, yPosition);
//     pdf.setFont("helvetica", "normal");
//     pdf.text(String(value), margin + 50, yPosition);
//     yPosition += 6;
//   });

//   yPosition += 10;

//   // Customer Information
//   if (orderDetails.user) {
//     console.log("🔍 [PDF Debug] Processing user data:", orderDetails.user);

//     pdf.setFont("helvetica", "bold");
//     pdf.text("Customer Information", margin, yPosition);

//     yPosition += 8;
//     pdf.line(margin, yPosition, pageWidth - margin, yPosition);
//     yPosition += 12;

//     pdf.setFontSize(10);
//     pdf.setFont("helvetica", "normal");

//     const customerInfo = [
//       [
//         "Name:",
//         `${orderDetails.user.firstName || ""} ${
//           orderDetails.user.lastName || ""
//         }`.trim() || "N/A",
//       ],
//       ["Email:", orderDetails.user.email || "N/A"],
//       ["Phone:", orderDetails.user.phone || "N/A"],
//       ["Address:", orderDetails.user.address || "N/A"],
//       ["City:", orderDetails.user.city || "N/A"],
//       ["Province:", orderDetails.user.province || "N/A"],
//     ];

//     if (orderDetails.user.landmark) {
//       customerInfo.push(["Landmark:", orderDetails.user.landmark]);
//     }
//     if (orderDetails.user.zip) {
//       customerInfo.push(["Postal Code:", orderDetails.user.zip]);
//     }

//     customerInfo.forEach(([label, value]) => {
//       pdf.setFont("helvetica", "bold");
//       pdf.text(label, margin, yPosition);
//       pdf.setFont("helvetica", "normal");

//       // Handle multi-line address
//       if (label === "Address:" && String(value).length > 40) {
//         const lines = pdf.splitTextToSize(
//           String(value),
//           pageWidth - margin - 60
//         );
//         pdf.text(lines, margin + 50, yPosition);
//         yPosition += (lines.length - 1) * 5;
//       } else {
//         pdf.text(String(value), margin + 50, yPosition);
//       }

//       yPosition += 6;
//     });

//     yPosition += 10;
//   } else {
//     console.warn("⚠️ [PDF Debug] No user data found in orderDetails");
//   }

//   // Payment Summary
//   pdf.setFont("helvetica", "bold");
//   pdf.text("Payment Summary", margin, yPosition);

//   yPosition += 8;
//   pdf.line(margin, yPosition, pageWidth - margin, yPosition);
//   yPosition += 12;

//   pdf.setFontSize(10);

//   // Subtotal
//   pdf.setFont("helvetica", "normal");
//   pdf.text("Subtotal:", margin, yPosition);
//   pdf.text(
//     `Rs. ${orderDetails.subtotal || 0}`,
//     pageWidth - margin - 20,
//     yPosition,
//     { align: "right" }
//   );
//   yPosition += 6;

//   // Savings
//   if (orderDetails.totalSavings && orderDetails.totalSavings > 0) {
//     pdf.setTextColor(139, 190, 103);
//     pdf.text("Total Savings:", margin, yPosition);
//     pdf.text(
//       `- Rs. ${orderDetails.totalSavings}`,
//       pageWidth - margin - 20,
//       yPosition,
//       { align: "right" }
//     );
//     pdf.setTextColor(0, 0, 0);
//     yPosition += 6;
//   }

//   // Coupon Discount
//   if (orderDetails.couponDiscount && orderDetails.couponDiscount > 0) {
//     const couponCode = orderDetails.couponCode || "COUPON";
//     pdf.text(`Coupon Discount (${couponCode}):`, margin, yPosition);
//     pdf.text(
//       `- Rs. ${orderDetails.couponDiscount}`,
//       pageWidth - margin - 20,
//       yPosition,
//       { align: "right" }
//     );
//     yPosition += 6;
//   }

//   // Bulk Discount
//   if (orderDetails.bulkDiscount && orderDetails.bulkDiscount > 0) {
//     pdf.text("Bulk Discount:", margin, yPosition);
//     pdf.text(
//       `- Rs. ${orderDetails.bulkDiscount}`,
//       pageWidth - margin - 20,
//       yPosition,
//       { align: "right" }
//     );
//     yPosition += 6;
//   }

//   // Total
//   yPosition += 5;
//   pdf.setDrawColor(139, 190, 103);
//   pdf.line(margin, yPosition, pageWidth - margin, yPosition);
//   yPosition += 8;

//   pdf.setFont("helvetica", "bold");
//   pdf.setFontSize(12);
//   pdf.setTextColor(139, 190, 103);
//   pdf.text("Total Amount:", margin, yPosition);
//   pdf.text(
//     `Rs. ${orderDetails.total || 0}`,
//     pageWidth - margin - 20,
//     yPosition,
//     { align: "right" }
//   );

//   // Footer
//   yPosition = pageHeight - 40;
//   pdf.setDrawColor(200, 200, 200);
//   pdf.line(margin, yPosition, pageWidth - margin, yPosition);
//   yPosition += 10;

//   pdf.setTextColor(100, 100, 100);
//   pdf.setFontSize(8);
//   pdf.setFont("helvetica", "normal");
//   pdf.text(
//     "Thank you for shopping with Zarwa Organics!",
//     pageWidth / 2,
//     yPosition,
//     { align: "center" }
//   );
//   yPosition += 4;
//   pdf.text(
//     "For any queries, contact: support@zarwaorganics.com | 0300-1234567",
//     pageWidth / 2,
//     yPosition,
//     { align: "center" }
//   );
//   yPosition += 4;
//   pdf.text(
//     `Generated on: ${new Date().toLocaleString()}`,
//     pageWidth / 2,
//     yPosition,
//     { align: "center" }
//   );

//   console.log("✅ [PDF Debug] PDF generation completed successfully");
//   return pdf;
// };

// export const downloadReceipt = async (
//   orderId: string,
//   orderDetails: OrderDetails | null
// ) => {
//   try {
//     console.log("🔍 [Download Debug] Starting download with:", {
//       orderId,
//       orderDetails,
//       timestamp: new Date().toISOString(),
//     });

//     if (!orderId) {
//       throw new Error("Order ID is required");
//     }

//     const pdf = await generateReceiptPDF(orderId, orderDetails);
//     const fileName = `Order#${orderId}-hair-growth-oil-by-zarwa-organics.pdf`;
//     pdf.save(fileName);

//     console.log("✅ [Download Debug] PDF downloaded successfully:", fileName);
//     return true;
//   } catch (error) {
//     console.error("❌ [Download Debug] Error generating PDF:", {
//       error,
//       orderId,
//       hasOrderDetails: !!orderDetails,
//       orderDetailsKeys: orderDetails ? Object.keys(orderDetails) : "null",
//     });
//     throw new Error("Failed to generate receipt");
//   }
// };
import jsPDF from "jspdf";
import logo from "@/public/images/logo.png";

interface OrderDetails {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    landmark?: string;
    zip?: string;
  };
  quantity?: number;
  subtotal?: number;
  totalSavings?: number;
  total?: number;
  couponCode?: string;
  couponDiscount?: number;
  bulkDiscount?: number;
  deliveryCharges?: number; // Rs.200 or Free
  prePayment?: number; // Rs.150, Rs.300 etc.
  paymentMethod?: string;
}

/**
 * Generate Zarwa Organics styled PDF receipt
 */
export const generateReceiptPDF = async (
  orderId: string,
  orderDetails: OrderDetails | null
) => {
  if (!orderDetails) throw new Error("Order details missing");

  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  let y = 60;

  // === HEADER ===
  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, 160, "F");

  try {
    pdf.addImage(
      logo.src || "/images/logo.png",
      "PNG",
      pageWidth / 2 - 40,
      25,
      80,
      80
    );
  } catch (e) {
    console.warn("⚠️ Logo not found, skipping logo image:", e);
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.setTextColor(0, 0, 0);
  pdf.text("Order Receipt", pageWidth / 2, 130, { align: "center" });

  pdf.setDrawColor(139, 190, 103);
  pdf.setLineWidth(1);
  pdf.line(margin, 150, pageWidth - margin, 150);

  // === ORDER INFO ===
  y = 180;
  pdf.setFillColor(248, 249, 250);
  pdf.rect(margin, y, pageWidth - margin * 2, 100, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Order Details", margin + 10, y + 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  const paymentMethod =
    orderDetails.paymentMethod?.replace("_", " ") || "Bank Transfer";

  const orderInfo = [
    ["Order ID:", orderId],
    ["Order Date:", new Date().toLocaleDateString()],
    ["Payment Method:", paymentMethod.toUpperCase()],
    ["Payment Status:", "Pending Verification"],
  ];

  let infoY = y + 40;
  orderInfo.forEach(([label, val]) => {
    pdf.setFont("helvetica", "bold");
    pdf.text(label, margin + 10, infoY);
    pdf.setFont("helvetica", "normal");
    pdf.text(val, margin + 130, infoY);
    infoY += 16;
  });

  // === CUSTOMER INFO ===
  y += 120;
  pdf.setFillColor(255, 255, 255);
  pdf.rect(margin, y, pageWidth - margin * 2, 160, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Customer Information", margin + 10, y + 20);

  if (orderDetails.user) {
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      landmark,
      zip,
    } = orderDetails.user;

    const customerInfo = [
      ["Name:", `${firstName || ""} ${lastName || ""}`.trim() || "N/A"],
      ["Email:", email || "N/A"],
      ["Phone:", phone || "N/A"],
      ["Address:", address || "N/A"],
      ["City:", city || "N/A"],
      ["Province:", province || "N/A"],
      landmark ? ["Landmark:", landmark] : null,
      zip ? ["Postal Code:", zip] : null,
    ].filter(Boolean) as [string, string][];

    let custY = y + 40;
    customerInfo.forEach(([label, val]) => {
      pdf.setFont("helvetica", "bold");
      pdf.text(label, margin + 10, custY);
      pdf.setFont("helvetica", "normal");
      pdf.text(val, margin + 130, custY);
      custY += 16;
    });
  }

  // === PAYMENT SUMMARY ===
  // === PAYMENT SUMMARY ===
  // === PAYMENT SUMMARY ===
  // === PAYMENT SUMMARY ===
  y += 190;
  pdf.setFillColor(248, 249, 250);
  pdf.rect(margin, y, pageWidth - margin * 2, 200, "F");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(0, 0, 0); // Ensure black text
  pdf.text("Payment Summary", margin + 10, y + 20);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  // ✅ FIXED: Helper function that resets color after each use
  const priceLine = (
    label: string,
    value: string,
    offset: number,
    color?: [number, number, number]
  ) => {
    // Set color if provided, otherwise use black
    if (color) {
      pdf.setTextColor(...color);
    } else {
      pdf.setTextColor(0, 0, 0); // Always default to black
    }

    pdf.text(label, margin + 10, y + offset);
    pdf.text(value, pageWidth - margin - 20, y + offset, { align: "right" });

    // ✅ CRITICAL FIX: Reset to black after each line
    pdf.setTextColor(0, 0, 0);
  };

  let sumY = y + 40;

  // Base breakdown - always black
  priceLine("Quantity:", `${orderDetails.quantity || 1}`, sumY);
  sumY += 16;

  priceLine(
    "Subtotal:",
    `Rs. ${orderDetails.subtotal?.toLocaleString() || 0}`,
    sumY
  );
  sumY += 16;

  // Discounts - green but will reset to black
  if (orderDetails.bulkDiscount && orderDetails.bulkDiscount > 0) {
    priceLine(
      "Bulk Discount:",
      `- Rs. ${orderDetails.bulkDiscount.toLocaleString()}`,
      sumY,
      [139, 190, 103] // Green color
    );
    sumY += 16;
  }

  if (orderDetails.couponDiscount && orderDetails.couponDiscount > 0) {
    priceLine(
      `Coupon (${orderDetails.couponCode || "APPLIED"}):`,
      `- Rs. ${orderDetails.couponDiscount.toLocaleString()}`,
      sumY,
      [139, 190, 103] // Green color
    );
    sumY += 16;
  }

  if (orderDetails.totalSavings && orderDetails.totalSavings > 0) {
    priceLine(
      "Total Savings:",
      `- Rs. ${orderDetails.totalSavings.toLocaleString()}`,
      sumY,
      [139, 190, 103] // Green color
    );
    sumY += 16;
  }

  // Delivery charges - should be black
  const deliveryLabel =
    orderDetails.deliveryCharges === 0
      ? "Delivery (Free)"
      : "Delivery Charges:";
  priceLine(
    deliveryLabel,
    orderDetails.deliveryCharges === 0
      ? "Free"
      : `Rs. ${orderDetails.deliveryCharges?.toLocaleString() || 200}`,
    sumY
  );
  sumY += 16;

  // Prepayment / security - should be black
  if (orderDetails.prePayment && orderDetails.prePayment > 0) {
    priceLine(
      "Pre-Charges / Security Payment:",
      `Rs. ${orderDetails.prePayment.toLocaleString()}`,
      sumY
    );
    sumY += 16;
  }

  // Separator line before total
  pdf.setDrawColor(139, 190, 103);
  pdf.line(margin, sumY + 6, pageWidth - margin, sumY + 6);

  // Final payable amount - green and bold
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(139, 190, 103); // Green color for total
  pdf.text("Amount Payable:", margin + 10, sumY + 24);
  pdf.text(
    `Rs. ${orderDetails.total?.toLocaleString() || 0}`,
    pageWidth - margin - 20,
    sumY + 24,
    { align: "right" }
  );

  // ✅ IMPORTANT: Reset text color to black for any future text
  pdf.setTextColor(0, 0, 0);

  // === FOOTER ===
  const footerY = 760;
  pdf.setDrawColor(230, 230, 230);
  pdf.line(margin, footerY, pageWidth - margin, footerY);

  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "Thank you for shopping with Zarwa Organics!",
    pageWidth / 2,
    footerY + 20,
    { align: "center" }
  );
  pdf.text(
    "For any queries: support@zarwaorganics.com | 0300-1234567",
    pageWidth / 2,
    footerY + 32,
    { align: "center" }
  );
  pdf.text(
    `Generated on: ${new Date().toLocaleString()}`,
    pageWidth / 2,
    footerY + 44,
    { align: "center" }
  );

  return pdf;
};

/**
 * Download receipt
 */
export const downloadReceipt = async (
  orderId: string,
  orderDetails: OrderDetails | null
) => {
  if (!orderId || !orderDetails) throw new Error("Missing order info");
  const pdf = await generateReceiptPDF(orderId, orderDetails);
  pdf.save(`Order#${orderId}-Zarwa-Organics-Receipt.pdf`);
};

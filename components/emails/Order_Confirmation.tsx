import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const OrderConfirmation = ({
  name,
  email,
  phone,
  item,
  total,
}: {
  name: string;
  email: string;
  phone: string;
  item: string;
  total: number;
}) => (
  <Html>
    <Head />
    <Body>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Container className="p-6 bg-gray-200 rounded shadow-md">
          <Text className="font-bold text-lg mb-2">Hello {name},</Text>
          <Text className="mb-4">Thank you for your order.</Text>
          <Text className="font-semibold mb-2">Your order details:</Text>
          <Text className="mb-1">Item: {item}</Text>
          <Text className="mb-1">Total: {total}</Text>
          <Text className="mb-1">Phone: {phone}</Text>

          <Text className="mt-4">
            Contact us at chari.rightson@gmail.com if you have any questions.
          </Text>
        </Container>
      </Tailwind>
    </Body>
  </Html>
);

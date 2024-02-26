import { IOrder, IOrderFetched } from "@/types";
import { root_domain } from "@/utils/data";
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

export const NewOrderEmail = ({
  name,
  email,
  phone,
  item,
  total,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  item: string;
  total: number;
  message?: string;
}) => {
  return (
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
          <Container className="p-6 bg-white rounded shadow-md">
            <Text className="font-bold text-lg mb-2">New Order Received!</Text>
            <Text className="font-semibold mb-2">Order Details:</Text>
            <Text className="mb-1">Name: {name}</Text>
            <Text className="mb-1">Email: {email}</Text>
            <Text className="mb-1">Phone: {phone}</Text>
            <Text className="mb-1">Item: {item}</Text>
            <Text className="mb-1">Total: {total}</Text>
            <Text className="mb-1">Message: {message}</Text>
            <Button
              href={`https://admin.${root_domain}/orders`}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              View Order Details
            </Button>
          </Container>
        </Tailwind>
      </Body>
    </Html>
  );
};

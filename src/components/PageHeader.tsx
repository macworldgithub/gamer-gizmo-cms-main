import Image from "next/image";

interface PageHeadProps {
  pageName: string;
  title?: string;
  description?: string;
  button?: string;
}

const PageHeader = ({ title, description, button }: PageHeadProps) => {
  return (
    <>
      {(title || description || button) && (
        <div className="w-full h-auto bg-custom-gradient text-white py-6">
          <div className="flex flex-col bg-custom-gradient items-start space-y-2 lg:px-32 md:px-32 max-md:px-7 mb-10">
            {title && (
              <h1 className="text-2xl lg:text-4xl max-md:text-lg font-bold">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-base mt-4 max-md:text-sm whitespace-pre-wrap">
                {description}
              </p>
            )}
            {button && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {button}
              </button>
            )}
          </div>
        </div>
      )}

      {!title && !description && !button && (
        <div className="w-full h-[100px] bg-custom-gradient text-white font-bold max-sm:flex max-sm:justify-center">
          <Image
            src="/images/HeroArea.png"
            width={0}
            height={0}
            sizes="100%"
            style={{ width: "100%", height: "100%", objectFit: "fill" }}
            alt="Hero Image"
          />
        </div>
      )}
    </>
  );
};

export default PageHeader;

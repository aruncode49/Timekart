import React from "react";
import Layout from "../layouts/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - Deal Daddy"}>
      <div className="pb-10 pt-5 text-lg">
        <p>
          <strong>Privacy Policy</strong>
          <br />
          <em>Last Updated: 2023</em>
          <br />
          <br />
          At Deal Daddy, we value your privacy and are committed to protecting
          your personal information. This Privacy Policy outlines how we
          collect, use, disclose, and safeguard your data when you access or use
          our e-commerce platform and related services (collectively, the
          "Services").
          <br />
          <br />
          <strong>Information We Collect</strong>
        </p>
        <ol>
          <li>
            <strong>Personal Information:</strong> We may collect personal
            information such as your name, email address, shipping address,
            payment details, and contact information when you create an account,
            make a purchase, or contact us.
          </li>
          <li>
            <strong>Usage Information:</strong> We may collect information about
            how you interact with our platform, including your browsing history,
            IP address, device information, and referral source.
          </li>
          <li>
            <strong>Cookies:</strong> We use cookies and similar tracking
            technologies to enhance your browsing experience, analyze usage
            patterns, and personalize content and ads.
          </li>
        </ol>
        <br />
        <strong>How We Use Your Information</strong>
        <ol>
          <li>
            <strong>Provide Services:</strong> We use your personal information
            to process orders, provide customer support, and improve our
            Services.
          </li>
          <li>
            <strong>Marketing:</strong> With your consent, we may send you
            promotional emails and updates about our products and services. You
            can opt-out at any time.
          </li>
          <li>
            <strong>Analytics:</strong> We use data for analytics purposes to
            better understand our users and improve our platform.
          </li>
        </ol>
        <br />
        <strong>Disclosure of Your Information</strong>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties without your explicit consent. However, we may share your data
          with service providers and partners who assist us in operating our
          platform and providing Services.
        </p>
        <br />
        <strong>Data Security</strong>
        <p>
          We implement industry-standard security measures to protect your data,
          but no method of transmission over the internet is completely secure.
          We cannot guarantee the security of your data.
        </p>
        <br />
        <strong>Your Choices</strong>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can also choose to opt-out of marketing
          communications.
        </p>
        <br />
        <strong>Changes to this Privacy Policy</strong>
        <p>
          We may update this Privacy Policy periodically to reflect changes in
          our practices. The updated policy will be posted on our platform, and
          the date of the latest revision will be indicated.
        </p>
        <br />
        <strong>Contact Us</strong>
        <p>
          If you have any questions or concerns about our Privacy Policy or how
          we handle your data, please contact us at{" "}
          <a
            className="text-blue-600"
            href="https://mail.google.com/mail/u/0/#inbox"
          >
            <em>click here</em>
          </a>
          .
        </p>
        <br />
        By accessing or using our Services, you consent to the practices
        described in this Privacy Policy.
        <p />
      </div>
    </Layout>
  );
};

export default Policy;

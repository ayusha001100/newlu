import ConvertBar from "@/organisms/convert-bar"
import SiteFooter from "@/organisms/site-footer"
import SiteHeader from "@/organisms/site-header"

export default function MarketingLayout({ children }) {
	return (
		<>
			<SiteHeader />
			<main className="flex-1 max-[720px]:pb-[84px]">{children}</main>
			<SiteFooter />
			<ConvertBar />
		</>
	)
}

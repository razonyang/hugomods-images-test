/**
 * Lightbox for Bootstrap 5
 * 
 * Taken from https://github.com/trvswgnr/bs5-lightbox
 * 
 * Adapted by Richard Bateman to typescript and various tweaks
 *
 * @file Creates a modal with a lightbox carousel.
 * @module bs5-lightbox
 */

import Modal from 'bootstrap/js/dist/modal';
import Carousel from 'bootstrap/js/dist/carousel';

type LightboxOptions = Modal.Options & Carousel.Options & {
  gallery: string;
  size: string;
  constrain: boolean;
  target: HTMLElement;
};

class Lightbox {
  private hash: string;
  private settings: LightboxOptions;
  private modalOptions: Modal.Options;
  private carouselOptions: Carousel.Options;
  private el: HTMLElement;
  private type: string;
  private src: string;
  private sources: string[];

  private modalElement?: HTMLDivElement;
  private carouselElement?: HTMLDivElement;

  modal?: Modal;
  carousel?: Carousel;

  static allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url']

  static allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image', 'html'];
  static defaultSelector = '[data-toggle="lightbox"]';
  static initialize = function (this: HTMLElement, e: Event) {
    e.preventDefault();
    const lightbox = new Lightbox(this);
    lightbox.show();
  };

	constructor(el?: HTMLElement | string, options: Partial<LightboxOptions> = {}) {
		this.hash = this.randomHash();
    const target = typeof el === 'string' ? document.querySelector(el) as HTMLElement : el;
    if (!target) { throw new Error("Invalid target"); }
		this.settings = {
      ...Modal.Default,
      ...Carousel.Default,
			interval: false,
			gallery: '',
			size: 'xl',
			constrain: true,
      target,

      // Apply new options
      ...options,
		};
		this.modalOptions = (() => this.setOptionsFromSettings(Modal.Default))();
		this.carouselOptions = (() => this.setOptionsFromSettings(Carousel.Default))();
		this.el = target;
		this.type = target.dataset.type || '';

		this.src = this.getSrc(target);
		this.sources = this.getGalleryItems();
		this.createCarousel();
		this.createModal();
	}
	show() {
		document.body.appendChild(this.modalElement!);
		this.modal?.show();
	}
	hide() {
		this.modal?.hide();
	}
	setOptionsFromSettings<T extends Record<string, any>>(obj: T): T {
		return Object.keys(obj).reduce((p, c) => Object.assign(p, { [c]: (<any>this).settings[c] }), {}) as T;
	}
	getSrc(el: HTMLElement | HTMLAnchorElement) {
		let src = el.dataset.src || el.dataset.remote || (<HTMLAnchorElement>el).href || 'http://via.placeholder.com/1600x900';
		if (el.dataset.type === 'html') {
			return src;
		}
		if (!/\:\/\//.test(src)) {
			src = window.location.origin + src;
		}
		const url = new URL(src);
		if (el.dataset.footer || el.dataset.caption) {
      const caption = el.dataset?.footer || el.dataset?.caption;
			url.searchParams.set('caption', caption || '');
		}
		return url.toString();
	}
	getGalleryItems() {
		let galleryTarget;
		if (this.settings.gallery) {
			if (Array.isArray(this.settings.gallery)) {
				return this.settings.gallery;
			}
			galleryTarget = this.settings.gallery;
		} else if (this.el.dataset.gallery) {
			galleryTarget = this.el.dataset.gallery;
		}
    const galleryTargets = Array.from(document.querySelectorAll(`[data-gallery="${galleryTarget}"]`)) as HTMLElement[];
		const gallery = galleryTarget
			? [...new Set(Array.from(galleryTargets, (v) => `${v.dataset.type ? v.dataset.type : ''}${this.getSrc(v)}`))]
			: [`${this.type ? this.type : ''}${this.src}`];
		return gallery;
	}
	getYoutubeId(src: string) {
		if (!src) return false;
		const matches = src.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
		return matches && matches[2].length === 11 ? matches[2] : false;
	}
	getYoutubeLink(src: string) {
		const youtubeId = this.getYoutubeId(src);
		if (!youtubeId) {
			return false;
		}

		const arr = src.split('?');
		let params = arr.length > 1 ? '?' + arr[1] : '';
		
		return `https://www.youtube.com/embed/${youtubeId}${params}`;
	}
	isEmbed(src: string) {
		const regex = new RegExp('(' + Lightbox.allowedEmbedTypes.join('|') + ')');
		const isEmbed = regex.test(src);
		const isImg = /\.(png|jpe?g|gif|svg|webp)/i.test(src) || this.el.dataset.type === 'image';

		return isEmbed || !isImg;
	}
	createCarousel() {
		const template = document.createElement('template');
		const types = Lightbox.allowedMediaTypes.join('|');
		const slidesHtml = this.sources
			.map((src, i) => {
				src = src.replace(/\/$/, '');
				const regex = new RegExp(`^(${types})`, 'i');
				const isHtml = /^html/.test(src);
				const isForcedImage = /^image/.test(src);

				if (regex.test(src)) {
					src = src.replace(regex, '');
				}
				const imgClasses = 'h-100 w-100';
				const params = new URLSearchParams(src.split('?')[1]);
				let caption = '';
				let url = src;
				if (params.get('caption')) {
					try {
						const urlObj = new URL(src);
						urlObj.searchParams.delete('caption');
						url = urlObj.toString();
					} catch (e) {
						url = src;
					}
					caption = `<p class="lightbox-caption m-0 p-2 text-center text-white small"><em>${params.get('caption')}</em></p>`;
				}
				let inner = `<img src="${url}" class="d-block ${imgClasses} img-fluid" style="z-index: 1; object-fit: contain; max-height: calc(100vh - 60px)" />`;
				let attributes = '';
				if (isHtml) {
					inner = src;
				}
				const spinner = `<div class="position-absolute top-50 start-50 translate-middle text-white"><div class="spinner-border" style="width: 3rem height: 3rem" role="status"></div></div>`;
				return `
				<div class="carousel-item ${!i ? 'active' : ''}"">
					${spinner}
					<div class="imgcontainer" style="background-color: #000;">${inner}</div>
					${caption}
				</div>`;
			})
			.join('');
    
		const controlsHtml =
			this.sources.length < 2
				? ''
				: `
			<button id="#lightboxCarousel-${this.hash}-prev" class="carousel-control carousel-control-prev h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button id="#lightboxCarousel-${this.hash}-next" class="carousel-control carousel-control-next h-75 m-auto" type="button" data-bs-target="#lightboxCarousel-${this.hash}" data-bs-slide="next">
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>`;
		let classes = 'lightbox-carousel carousel slide carousel-fade';
		if (this.settings.size === 'fullscreen') {
			classes += ' position-absolute w-100 translate-middle top-50 start-50';
		}
		const html = `
			<div id="lightboxCarousel-${this.hash}" class="${classes}" data-bs-ride="carousel" data-bs-interval="${this.carouselOptions.interval}">
				<div class="carousel-inner">
					${slidesHtml}
				</div>
				${controlsHtml}
			</div>`;
		template.innerHTML = html.trim();
		this.carouselElement = template.content.firstChild as HTMLDivElement;
		const carouselOptions = {
      ...this.carouselOptions,
      keyboard: false,
    }
		this.carousel = new Carousel(this.carouselElement, carouselOptions);
		const elSrc = this.type && this.type !== 'image' ? this.type + this.src : this.src;
		this.carousel.to(this.findGalleryItemIndex(this.sources, elSrc));
		if (this.carouselOptions.keyboard === true) {
			document.addEventListener('keydown', (e) => {
				if (e.code === 'ArrowLeft') {
					const prev = document.getElementById(`#lightboxCarousel-${this.hash}-prev`);
					if (prev) {
						prev.click();
					}
					return false;
				}
				if (e.code === 'ArrowRight') {
					const next = document.getElementById(`#lightboxCarousel-${this.hash}-next`);
					if (next) {
						next.click();
					}
					return false;
				}
			});
		}
		return this.carousel;
	}
	findGalleryItemIndex(haystack: string[], needle: string) {
		let index = 0;
		for (const item of haystack) {
			if (item.includes(needle)) {
				return index;
			}
			index++;
		}
		return 0;
	}
	createModal() {
		const template = document.createElement('template');
		const btnInner =
			'<svg xmlns="http://www.w3.org/2000/svg" style="position: relative; top: -5px;" viewBox="0 0 16 16" fill="#fff"><path d="M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z"/></svg>';
		const html = `
			<div class="modal lightbox fade" id="lightboxModal-${this.hash}" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-${this.settings.size}">
					<div class="modal-content border-0 bg-transparent">
						<div class="modal-body p-0">
							<button type="button" class="btn-close position-absolute top-0 end-0 p-3" data-bs-dismiss="modal" aria-label="Close" style="z-index: 2; background: none;">${btnInner}</button>
						</div>
					</div>
				</div>
			</div>`;
		template.innerHTML = html.trim();
		this.modalElement = template.content.firstChild as HTMLDivElement;
    if (this.carouselElement) {
     	this.modalElement.querySelector('.modal-body')?.appendChild(this.carouselElement!);
    }
		this.modalElement.addEventListener('hidden.bs.modal', () => this.modalElement?.remove());
		this.modalElement.querySelector('[data-bs-dismiss]')?.addEventListener('click', () => this.modal?.hide());
		this.modal = new Modal(this.modalElement, this.modalOptions);
		return this.modal;
	}
	randomHash(length = 8) {
		return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('');
	}
}

// $(() => {
//   document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', Lightbox.initialize));
// });
if (typeof window !== 'undefined' && (<any>window).bootstrap) {
	(<any>window).bootstrap.Lightbox = Lightbox;
}
export default Lightbox;

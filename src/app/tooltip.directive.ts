import {
  Directive,
  Input,
  TemplateRef,
  Type,
  ComponentRef,
  ViewContainerRef,
  ElementRef,
  Renderer2,
  Injector,
  HostListener,
  ReflectiveInjector,
  OnDestroy,
  ComponentFactoryResolver
} from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[tooltip]'
})
export class TooltipDirective implements OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('tooltip') content: string | TemplateRef<any> | Type<any>;
  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('mouseenter')
  mouseenter() {
    if (this.componentRef) {
      return;
    }
    const factory = this.resolver.resolveComponentFactory(TooltipComponent);
    const injector = ReflectiveInjector.resolveAndCreate([
      {
        provide: 'tooltipConfig',
        useValue: {
          host: this.element.nativeElement
        }
      }
    ]);
    this.componentRef = this.viewContainerRef.createComponent(
      factory,
      0,
      injector,
      this.generateNgContent()
    );
  }

  // remove component on mouseout event
  @HostListener('mouseout')
  mouseout() {
    this.destroy();
  }

  destroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }

  ngOnDestroy() {
    this.destroy();
  }

  // this.content = 2d-array of DOM elments [[DOM]]
  generateNgContent() {
    // handling text
    if (typeof this.content === 'string') {
      // creating text node with renderer service
      const element = this.renderer.createText(this.content);
      return [[element]];
    }
    if (this.content instanceof TemplateRef) {
      const context = {};
      // instantiate embedded view based on templateRef. (Getting a ref to View Object.)
      // View-Object contains rootNodes = array of doomElements (e.g. text, span, div)
      const viewRef = this.content.createEmbeddedView(context);
      return [viewRef.rootNodes];
    } else {
      // it is a component
      const factory = this.resolver.resolveComponentFactory(this.content);
      const componentRef = factory.create(this.injector);
      return [ [componentRef.location.nativeElement ]];
    }

  }
}

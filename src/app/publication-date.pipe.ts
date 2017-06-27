import { Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';
import 'moment/locale/es';

@Pipe({name: 'PublicationDatePipe'})
export class PublicationDatePipe implements PipeTransform{
    
    transform(value: number): string {
        let date = new Date(value);
        return moment(date).fromNow();
    }
}
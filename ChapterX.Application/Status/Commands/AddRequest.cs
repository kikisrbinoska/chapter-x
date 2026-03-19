using MediatR;
using StatusEnum = ChapterX.Domain.Entities.Status;

namespace ChapterX.Application.Status.Commands
{
    public record AddRequest(StatusEnum Value) : IRequest<AddResponse>;
}

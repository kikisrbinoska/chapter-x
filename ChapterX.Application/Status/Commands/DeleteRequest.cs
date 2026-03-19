using MediatR;
using StatusEnum = ChapterX.Domain.Entities.Status;

namespace ChapterX.Application.Status.Commands
{
    public record DeleteRequest(StatusEnum Value) : IRequest<DeleteResponse>;
}

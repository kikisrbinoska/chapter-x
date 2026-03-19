using MediatR;

namespace ChapterX.Application.Status.Commands
{
    public record UpdateRequest(int Id) : IRequest<UpdateResponse>;
}

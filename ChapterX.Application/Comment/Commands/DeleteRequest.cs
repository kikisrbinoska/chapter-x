using MediatR;

namespace ChapterX.Application.Comment.Commands
{
    public record DeleteRequest(int Id, int CallerId) : IRequest<DeleteResponse>;
}

using MediatR;

namespace ChapterX.Application.ReadingListItems.Commands
{
    public record DeleteRequest(int Id) : IRequest<DeleteResponse>;
}
